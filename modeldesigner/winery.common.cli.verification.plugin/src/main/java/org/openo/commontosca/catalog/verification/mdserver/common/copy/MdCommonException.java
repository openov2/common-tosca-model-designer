/**
 * Copyright 2017 ZTE Corporation.
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
package org.openo.commontosca.catalog.verification.mdserver.common.copy;

/**
 *
 */
public class MdCommonException extends Exception {
    /** */
    private static final long serialVersionUID = 1L;

    /**
     * @param exceptDesc
     */
    public MdCommonException(String exceptDesc) {
        super(exceptDesc);
    }

    /**
     * @param exceptDesc
     * @param cause
     */
    public MdCommonException(String exceptDesc, Throwable cause) {
        super(exceptDesc, cause);
    }

}
