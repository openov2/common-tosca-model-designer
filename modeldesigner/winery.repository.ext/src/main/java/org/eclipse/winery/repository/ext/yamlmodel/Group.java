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
package org.eclipse.winery.repository.ext.yamlmodel;

import java.util.HashMap;
import java.util.Map;

/**
 * This implementation can be delayed because it's not used yet.
 */
public class Group extends YAMLElement {
    private String type = "";
    private Map<String, Object> properties = new HashMap<String, Object>();
    private String[] members = new String[0];

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Map<String, Object> getProperties() {
        return properties;
    }

    public void setProperties(Map<String, Object> properties) {
        if (properties == null || properties.isEmpty()) {
            return;
        }
        this.properties = properties;
    }

    public String[] getMembers() {
      return members;
    }

    public void setMembers(String[] members) {
      if (members == null || members.length == 0) {
        return;
      }
      this.members = members;
    }
    
    

}