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

import { useState } from "react"
import { MiniSidemenuEvent } from "src/data/bus-events"
import { SidemenuMinimodeKey } from "src/data/storage-keys"
import useBus from "use-bus"
import storage from "utils/localStorage"

// listening for the event of mini sidemenu
const useMiniMode = () => {
    const [miniMode, setMiniMode] = useState(storage.get(SidemenuMinimodeKey)??true)

    useBus(
        (e) => { return e.type == MiniSidemenuEvent },
        (e) => {
            setMiniMode(e.data)
        }
    )

    return miniMode
}

export default useMiniMode