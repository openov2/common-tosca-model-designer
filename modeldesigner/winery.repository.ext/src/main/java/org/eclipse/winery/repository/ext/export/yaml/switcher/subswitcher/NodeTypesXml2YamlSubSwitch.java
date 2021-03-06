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
package org.eclipse.winery.repository.ext.export.yaml.switcher.subswitcher;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.xml.namespace.QName;

import org.eclipse.winery.common.ModelUtilities;
import org.eclipse.winery.common.Util;
import org.eclipse.winery.common.propertydefinitionkv.PropertyDefinitionKV;
import org.eclipse.winery.common.propertydefinitionkv.PropertyDefinitionKVList;
import org.eclipse.winery.common.propertydefinitionkv.WinerysPropertiesDefinition;
import org.eclipse.winery.model.tosca.TCapabilityDefinition;
import org.eclipse.winery.model.tosca.TConstraint;
import org.eclipse.winery.model.tosca.TNodeType;
import org.eclipse.winery.model.tosca.TNodeType.CapabilityDefinitions;
import org.eclipse.winery.model.tosca.TNodeType.Interfaces;
import org.eclipse.winery.model.tosca.TNodeType.RequirementDefinitions;
import org.eclipse.winery.model.tosca.TRequirementDefinition;
import org.eclipse.winery.repository.ext.export.yaml.switcher.Xml2YamlSwitch;
import org.eclipse.winery.repository.ext.yamlmodel.CapabilityDefinition;
import org.eclipse.winery.repository.ext.yamlmodel.DataType;
import org.eclipse.winery.repository.ext.yamlmodel.NodeType;
import org.eclipse.winery.repository.ext.yamlmodel.PropertyDefinition;
import org.eclipse.winery.repository.ext.yamlmodel.RequirementDefinition;
import org.eclipse.winery.repository.resources.entitytypes.requirementtypes.RequirementTypesResource;
import org.w3c.dom.Element;

/**
 * This class supports processing of node types from a YAML service template.
 */
public class NodeTypesXml2YamlSubSwitch extends AbstractXml2YamlSubSwitch {

    public NodeTypesXml2YamlSubSwitch(Xml2YamlSwitch parentSwitch) {
        super(parentSwitch);
    }

    /**
     * Processes every in-memory node type and creates a corresponding YAML node type.
     */
    @Override
    public void process() {
        List<?> tNodeList = getDefinitions().getServiceTemplateOrNodeTypeOrNodeTypeImplementation();
        if (tNodeList != null) {
            for (Object tNode : tNodeList) {
                if (tNode instanceof TNodeType) {
                    Entry<String, NodeType> yNodeType = createNodeType((TNodeType) tNode);
                    getServiceTemplate().getNode_types().put(yNodeType.getKey(),
                            yNodeType.getValue());

                    Map<String, DataType> yDataTypes = createDataType((TNodeType) tNode);
                    getServiceTemplate().getData_types().putAll(yDataTypes);
                }

            }
        }
    }

    private Map<String, DataType> createDataType(TNodeType tNode) {
        Map<String, DataType> result = new HashMap<String, DataType>();
        if (null == tNode.getAny()) {
            return result;
        }

        WinerysPropertiesDefinition wpd = null;
        for (Object o : tNode.getAny()) {
            if (o instanceof WinerysPropertiesDefinition) {
                wpd = (WinerysPropertiesDefinition) o;
                if ("Properties".equals(wpd.getElementName())) {
                    // Properties is not a DataType
                    continue;
                }

                DataType dataType = buidlDataType(wpd);
                result.put(wpd.getElementName(), dataType);
            }
        }

        return result;
    }

    private DataType buidlDataType(WinerysPropertiesDefinition wpd) {
        DataType result = new DataType();
        Map<String, PropertyDefinition> properties = result.getProperties();
        PropertyDefinitionKVList pdkvList = wpd.getPropertyDefinitionKVList();
        if (pdkvList != null && !pdkvList.isEmpty()) {
            for (PropertyDefinitionKV pdKV : pdkvList) {
                properties.put(pdKV.getKey(), Xml2YamlSwitchUtils.buildPropertyDefinition(pdKV));
            }
        }
        return result;
    }

    /**
     * @param tNodeType
     * @return
     */
    public Entry<String, NodeType> createNodeType(TNodeType tNodeType) {
        NodeType yNodeType = new NodeType();
        
        String name = Xml2YamlTypeMapper.mappingNodeType(tNodeType.getName());
        // derived_from
        if (tNodeType.getDerivedFrom() == null) {
            yNodeType.setDerived_from(Xml2YamlTypeMapper.mappingNodeTypeDerivedFrom(null, name));
        } else {
            yNodeType.setDerived_from(
                Xml2YamlTypeMapper.mappingNodeTypeDerivedFrom(
                    Xml2YamlSwitchUtils.getNamefromQName(tNodeType.getDerivedFrom().getTypeRef()), name));
        }

        // description
        yNodeType.setDescription(
            Xml2YamlSwitchUtils.convert2Description(tNodeType.getDocumentation()));

        // properties
        yNodeType.setProperties(
            Xml2YamlSwitchUtils.convert2PropertyDefinitions(tNodeType.getAny()));

        // attributes
        yNodeType.setAttributes(
            Xml2YamlSwitchUtils.convert2AttributeDefinitions(tNodeType.getAny()));

        // capabilities
        CapabilityDefinitions tCapabilities = tNodeType.getCapabilityDefinitions();
        if (tCapabilities != null) {
            yNodeType.getCapabilities().putAll(parseCapabilityDefinitions(tCapabilities));
        }

        // requirements
        RequirementDefinitions tRequirements = tNodeType.getRequirementDefinitions();
        if (tRequirements != null) {
            List<Map<String, RequirementDefinition>> yRequirementList =
                    parseRequirementDefinitions(tRequirements);
            yNodeType.getRequirements().addAll(yRequirementList);
        }

        // interfaces
        Interfaces tInterfaces = tNodeType.getInterfaces();
        if (tInterfaces != null) {
            Map<String, Map<String, Map<String, String>>> yamlInterfaces =
                    parseNodeTypeInterfaces(tInterfaces);
            yNodeType.setInterfaces(yamlInterfaces);
        }

        // TODO artifacts

        return Xml2YamlSwitchUtils.buildEntry(name, yNodeType);
    }

    /**
     * @param tInterfaces
     * @return
     */
    private Map<String, Map<String, Map<String, String>>> parseNodeTypeInterfaces(
            Interfaces tInterfaces) {
        // TODO Auto-generated method stub
        return null;
    }

    // private Interfaces parseNodeTypeInterfaces(Map<String, Map<String, Map<String, String>>>
    // interfaces) {
    // Interfaces result = new Interfaces();
    // for (Entry<String, Map<String, Map<String, String>>> entry : interfaces.entrySet()) {
    // TInterface inf = getInterfaceWithOperations(entry);
    // result.getInterface().add(inf);
    // }
    // return result;
    // }

    /**
     * @param tRequirements
     * @return
     */
    private List<Map<String, RequirementDefinition>> parseRequirementDefinitions(
            RequirementDefinitions tRequirements) {
        List<Map<String, RequirementDefinition>> yRequirementList = new ArrayList<>();

        List<TRequirementDefinition> tRequirementList = tRequirements.getRequirementDefinition();
        for (TRequirementDefinition tRequirement : tRequirementList) {
            Map<String, RequirementDefinition> yRequirement = new HashMap<>();
            yRequirement.put(
                tRequirement.getName(), convert2YamlRequirementDefinition(tRequirement));

            yRequirementList.add(yRequirement);
        }

        return yRequirementList;
    }

    private RequirementDefinition convert2YamlRequirementDefinition(TRequirementDefinition tRequirement) {
      RequirementDefinition yRequirementDef = new RequirementDefinition();
      // capability
      yRequirementDef.setCapability(parseCapability(tRequirement));
      // relationship
      yRequirementDef.setRelationship(parseRelationship(tRequirement));
     // occurrences
      yRequirementDef.setOccurrences(RequirementDefinition.UNBOUNDED_OCCURRENCE);
      
      return yRequirementDef;
    }

    private String parseCapability(TRequirementDefinition tRequirement) {
      String tRequirementTypeName =
              Xml2YamlSwitchUtils.getNamefromQName(tRequirement.getRequirementType());

      QName tCapabilityType =
          new RequirementTypesResource().getComponentInstaceResource(
              Util.URLencode(tRequirement.getRequirementType().getNamespaceURI()), tRequirementTypeName)
              .getRequiredCapabilityTypeResource().getRequirementType().getRequiredCapabilityType();

      if (tCapabilityType != null) {
        String tCapabilityTypeName = Xml2YamlSwitchUtils.getNamefromQName(tCapabilityType);
        return Xml2YamlTypeMapper.mappingCapabilityType(tCapabilityTypeName);
      }
      
      return Xml2YamlTypeMapper.mappingTRequirement2yCapabilityType(tRequirementTypeName);
    }

    private String parseRelationship(TRequirementDefinition tRequirement) {
      if (tRequirement.getConstraints() == null
          || tRequirement.getConstraints().getConstraint() == null
          || tRequirement.getConstraints().getConstraint().isEmpty()) {
        return null;
      }
      TConstraint tConstraint = tRequirement.getConstraints().getConstraint().get(0);
      if ("relationship".equals(tConstraint.getConstraintType()) && tConstraint.getAny() != null) {
        return ModelUtilities.resolvePropertiesElement((Element) tConstraint.getAny()).get("relationship");
      }
      
      return null;
    }

    private Map<String, CapabilityDefinition> parseCapabilityDefinitions(CapabilityDefinitions tCapabilities) {
        Map<String, CapabilityDefinition> yCapabilities = new HashMap<>();
        if (tCapabilities.getCapabilityDefinition() != null
                && !tCapabilities.getCapabilityDefinition().isEmpty()) {
            for (TCapabilityDefinition tCapability : tCapabilities.getCapabilityDefinition()) {
                yCapabilities.put(tCapability.getName(), convert2YamlCapabilityDefinition(tCapability));
            }
        }

        return yCapabilities;
    }

    private CapabilityDefinition convert2YamlCapabilityDefinition(TCapabilityDefinition tCapability) {
      CapabilityDefinition yCapabilityDef = new CapabilityDefinition();
      yCapabilityDef.setType(
          Xml2YamlTypeMapper.mappingCapabilityType(
              Xml2YamlSwitchUtils.getNamefromQName(tCapability.getCapabilityType())));
      
        return yCapabilityDef;
    }

}
