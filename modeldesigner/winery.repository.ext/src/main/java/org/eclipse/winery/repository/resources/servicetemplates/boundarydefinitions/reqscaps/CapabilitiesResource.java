/*******************************************************************************
 * Copyright (c) 2014 University of Stuttgart.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and the Apache License 2.0 which both accompany this distribution,
 * and are available at http://www.eclipse.org/legal/epl-v10.html
 * and http://www.apache.org/licenses/LICENSE-2.0
 *
 * Contributors:
 *     Oliver Kopp - initial API and implementation
 *******************************************************************************/
/*
 * Modifications Copyright 2016 ZTE Corporation.
 */

package org.eclipse.winery.repository.resources.servicetemplates.boundarydefinitions.reqscaps;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.xml.namespace.QName;

import org.eclipse.winery.common.ModelUtilities;
import org.eclipse.winery.common.servicetemplate.boundarydefinitions.reqscaps.ReqCapInfo;
import org.eclipse.winery.common.servicetemplate.boundarydefinitions.reqscaps.ReqsCapsRequest;
import org.eclipse.winery.model.tosca.TCapability;
import org.eclipse.winery.model.tosca.TCapabilityRef;
import org.eclipse.winery.repository.backend.BackendUtils;
import org.eclipse.winery.repository.resources._support.IPersistable;
import org.eclipse.winery.repository.resources._support.collections.CollectionsHelper;
import org.eclipse.winery.repository.resources._support.collections.withoutid.EntityWithoutIdCollectionResource;
import org.eclipse.winery.repository.resources.servicetemplates.ServiceTemplateResource;

import com.sun.jersey.api.view.Viewable;

/**
 * This class is an adaption from
 * {@link org.eclipse.winery.repository.resources.servicetemplates.boundarydefinitions.reqscaps.RequirementsResource}
 */
public class CapabilitiesResource extends
    EntityWithoutIdCollectionResource<CapabilityResource, TCapabilityRef> {

  public CapabilitiesResource(IPersistable res, List<TCapabilityRef> refs) {
    super(CapabilityResource.class, TCapabilityRef.class, refs, res);
  }

  @Override
  public Viewable getHTML() {
    throw new IllegalStateException(
        "Not yet required: boundarydefinitions.jsp renders all tab content.");
  }

  @POST
  @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
  public Response addNewElement(@FormParam("name") String name, @FormParam("ref") String reference) {
    // Implementation adapted from super addNewElement

    if (reference == null) {
      return Response.status(Status.BAD_REQUEST).entity("A reference has to be provided").build();
    }

    TCapabilityRef ref = new TCapabilityRef();
    ref.setName(name); // may also be null

    // The XML model fordces us to put a reference to the object and not just the string
    ServiceTemplateResource rs = (ServiceTemplateResource) this.res;
    TCapability resolved = ModelUtilities.resolveCapability(rs.getServiceTemplate(), reference);
    // In case nothing was found: report back to the user
    if (resolved == null) {
      return Response.status(Status.BAD_REQUEST).entity("Reference could not be resolved").build();
    }

    ref.setRef(resolved);

    // "this.alreadyContains(ref)" cannot be called as this leads to a mappable exception: The
    // data does not contain an id where the given ref attribute may point to

    this.list.add(ref);
    return CollectionsHelper.persist(this.res, this, ref);
  }

  @POST
  @Path("list/")
  @Consumes(MediaType.APPLICATION_JSON)
  public Response addElements(ReqsCapsRequest request) {

    addCapabilities(request);

    return BackendUtils.persist(this.res);
  }

  public void addCapabilities(ReqsCapsRequest request) {
    if (null == request || null == request.getReqcapList()) {
      return;
    }

    this.list.clear();
    for (ReqCapInfo info : request.getReqcapList()) {
      if (null == info.getName() || null == info.getRef()) {
        continue;
      }

      ServiceTemplateResource rs = (ServiceTemplateResource) this.res;
      TCapability resolved =
          ModelUtilities.resolveCapability(rs.getServiceTemplate(), info.getRef());
      if (resolved == null) {
        continue;
      }

      TCapabilityRef ref = new TCapabilityRef();
      ref.setName(info.getName());
      ref.setRef(resolved);

      this.list.add(ref);
    }
  }

  @GET
  @Path("list/")
  @Produces(MediaType.APPLICATION_JSON)
  public Response getElements() {
    List<ReqCapInfo> reqcapList = new ArrayList<ReqCapInfo>();
    if (this.list != null) {
      for (TCapabilityRef ref : this.list) {
        ReqCapInfo info = buildReqCapInfo(ref);
        reqcapList.add(info);
      }
    }
    return Response.ok().entity(reqcapList).build();
  }

  private ReqCapInfo buildReqCapInfo(TCapabilityRef ref) {
    ReqCapInfo info = new ReqCapInfo();
    info.setName(ref.getName());
    TCapability cap = (TCapability) ref.getRef();
    info.setRef(cap.getId());
    String refNodeName = cap.getOtherAttributes().get(new QName("refNodeName"));
    info.setNodeName(refNodeName);
    info.setRefName(cap.getName());
    return info;
  }
}
