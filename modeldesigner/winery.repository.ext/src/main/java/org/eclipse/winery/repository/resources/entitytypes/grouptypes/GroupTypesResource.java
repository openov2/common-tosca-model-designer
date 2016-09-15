/**
 * Copyright 2016 [ZTE] and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.eclipse.winery.repository.resources.entitytypes.grouptypes;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.eclipse.winery.repository.resources.AbstractComponentsResource;

/**
 * @author 10186401
 *
 */
public class GroupTypesResource extends AbstractComponentsResource<GroupTypeResource> {

    @POST
    @Path("{namespace}/{id}/create")
    public Response createGroupType(@PathParam("namespace") String namespace,
            @PathParam("id") String id) {
        super.onPost(namespace, id);
        return Response.status(Status.CREATED).build();
    }
}