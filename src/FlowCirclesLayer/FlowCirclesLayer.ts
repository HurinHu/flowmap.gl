/*
 * Copyright 2018 Teralytics
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { ScatterplotLayer } from 'deck.gl';
import { RGBA } from '../types';
import VertexShader from './FlowCirclesLayerVertex.glsl';
import VertexShader64 from './FlowCirclesLayerVertex64.glsl';

export type FlowCirclesData = any;

export interface Props {
  id: string;
  opacity?: number;
  pickable?: boolean;
  fp64?: boolean;
  updateTriggers?: { [key: string]: {} };
  getColor?: (d: FlowCirclesData) => RGBA;
  getPosition: (d: FlowCirclesData) => [number, number];
  getRadius: (d: FlowCirclesData) => [number, number];
  data: FlowCirclesData[];
}

class FlowCirclesLayer extends ScatterplotLayer {
  static layerName: string = 'FlowCirclesLayer';

  constructor(props: Props) {
    super(props);
  }

  getShaders() {
    const shaders = super.getShaders();
    return {
      ...shaders,
      vs: this.use64bitProjection() ? VertexShader64 : VertexShader,
    };
  }
}

export default FlowCirclesLayer;