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

import java.util.HashMap;
import java.util.Map;


public abstract class RepositoryUploadService {

  public static final String DEFAULT = "nfv";

  protected String packageType;

  protected Map<String, Object> extMap = new HashMap<String, Object>();

  abstract public boolean publish(String filePath);

  public String getScope() {
    return DEFAULT;
  }

  public void setPackageType(String packageType) {
    this.packageType = packageType;
  }

  public void addExtInfo(String key, Object value) {
    extMap.put(key, value);
  }

  public void addExtInfos(Map<String, Object> extInfos) {
    extMap.putAll(extInfos);
  }
}
