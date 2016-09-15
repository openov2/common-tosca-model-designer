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
package de.ustutt.iaas.bpmn2bpel.model;

public class LoopTask extends AndGatewaySplit {

    private String condition;

    public GatewayBranch getBranch() {
        if (branchMap.isEmpty()) {
            return null;
        }

        GatewayBranch branch = branchMap.values().iterator().next();
        if (null == branch) {
            return null;
        }

        branch.setCondition(condition);
        return branch;
    }

    public LoopTask() {
        super();
        // TODO Auto-generated constructor stub
    }

    public LoopTask(String condition) {
        super();
        this.condition = condition;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }
}