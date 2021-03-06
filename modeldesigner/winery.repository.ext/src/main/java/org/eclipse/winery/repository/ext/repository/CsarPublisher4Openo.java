/**
 * Copyright 2016 ZTE Corporation.
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
package org.eclipse.winery.repository.ext.repository;

import java.util.List;

import javax.ws.rs.core.Response.Status.Family;

import org.eclipse.winery.repository.CSARDeployClient;
import org.eclipse.winery.repository.Constants;
import org.slf4j.ext.XLogger;
import org.slf4j.ext.XLoggerFactory;

import com.sun.jersey.api.client.ClientResponse.Status;

/**
 * @author 10186401
 *
 */
public class CsarPublisher4Openo extends RepositoryUploadService {

  private static final XLogger logger = XLoggerFactory.getXLogger(CsarPublisher4Openo.class);
  private static final String DEPLOY_TYPE_OPENO = "openo";

  private CSARDeployClient client;

  @Override
  public boolean publish(String filePath) {
    init();
    boolean result = false;
    try {
      List<Status> deployStatus = client.deployCSAR(filePath);
      Status status = deployStatus.get(0);
      if (Family.SUCCESSFUL.equals(status.getFamily())) {
        result = true;
      }
    } catch (Exception e) {
      logger.error(e.getMessage());
    }
    return result;
  }

  private void init() {
    if (null == client) {
      logger.info("init client");
      String host = (String) extMap.get(Constants.IP);
      int port = (int) extMap.get(Constants.PORT);
      port = port == -1 ? 80 : port;
      client = new CSARDeployClient(host, String.valueOf(port), "/openoapi/catalog/v1/csars");
      logger.info("init client finished! ip:{} port:{}", host, port);
    }
  }

  @Override
  public String getScope() {
    return DEPLOY_TYPE_OPENO;
  }

}
