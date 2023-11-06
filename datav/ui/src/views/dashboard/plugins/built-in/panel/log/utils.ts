// Copyright 2023 xObserve.io Team
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { concat } from "lodash"
import {  ColorGenerator } from "utils/colorGenerator"
import { barPalettes, paletteColorNameToHex } from "utils/colors"

const idSplitter = '='
export const formatLabelId  = (name, value) => {
    return name + idSplitter + value
}

export const getLabelFromId = id => {
    return id.split(idSplitter)
}

const logColorGenerator = new ColorGenerator(concat(
    // COLORS_HEX,
    barPalettes))
export const getLabelNameColor = (id,theme, generator?) => {
    return  paletteColorNameToHex((generator??logColorGenerator).getColorByKey(id),theme)
}

export const isLogSeriesData = (data: any): boolean => {
    return data && data.labels && data.values
}