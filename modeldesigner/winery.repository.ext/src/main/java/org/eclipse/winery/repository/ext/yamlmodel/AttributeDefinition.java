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
package org.eclipse.winery.repository.ext.yamlmodel;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Sebi
 */
public class AttributeDefinition extends YAMLElement {
	private String type = "";
	private String defaultValue = "";
    private String status = "supported";
	private Map<String, String> entry_schema = new HashMap<String, String>();

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		if (type != null) {
			this.type = type;
		}
	}

	public String getDefault() {
		return this.defaultValue;
	}

	public void setDefault(String defaultValue) {
		if (defaultValue != null) {
			this.defaultValue = defaultValue;
		}
	}

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Map<String, String> getEntry_schema() {
		return this.entry_schema;
	}

	public void setEntry_schema(Map<String, String> entry_schema) {
		this.entry_schema = entry_schema;
	}

    // @Override
    // public boolean equals(Object o) {
    // if (this == o) {
    // return true;
    // }
    // if (o == null || getClass() != o.getClass()) {
    // return false;
    // }
    // if (!super.equals(o)) {
    // return false;
    // }
    //
    // final AttributeDefinition that = (AttributeDefinition) o;
    //
    // if (this.required != that.required) {
    // return false;
    // }
    // if (!this.constraints.equals(that.constraints)) {
    // return false;
    // }
    // if (!this.defaultValue.equals(that.defaultValue)) {
    // return false;
    // }
    // if (!this.type.equals(that.type)) {
    // return false;
    // }
    //
    // return true;
    // }
    //
    // @Override
    // public int hashCode() {
    // int result = super.hashCode();
    // result = 31 * result + this.type.hashCode();
    // result = 31 * result + this.defaultValue.hashCode();
    // result = 31 * result + (this.required ? 1 : 0);
    // result = 31 * result + this.constraints.hashCode();
    // return result;
    // }
}