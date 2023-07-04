import { Box, Flex, HStack,  Select, Tooltip} from "@chakra-ui/react"
import IconButton from "components/button/IconButton"
import { getInitTimeRange, TimePickerKey } from "components/DatePicker/TimePicker"
import SelectVariables from "src/views/variables/Variables"
import { subMinutes } from "date-fns"
import { find, isEmpty } from "lodash"
import { useRouter } from "next/router"

import { memo, useEffect, useRef, useState } from "react"
import { MdSync } from "react-icons/md"
import {  TimeChangedEvent, VariableChangedEvent } from "src/data/bus-events"
import ReserveUrls from "src/data/reserve-urls"
import { Dashboard } from "types/dashboard"
import { Team } from "types/teams"
import { TimeRange } from "types/time"
import useBus, { dispatch } from "use-bus"
import { requestApi } from "utils/axios/request"
import storage from "utils/localStorage"
import AddPanel from "./AddPanel"
import { variables } from "./Dashboard"
import DashboardSave from "./DashboardSave"
import DashboardSettings from "./settings/DashboardSettings"
import useMiniMode from "hooks/useMiniMode"
import Fullscreen from "components/fullscreen"
import useFullscreen from "hooks/useFullscreen"
import DatePicker from "components/DatePicker/DatePicker"

interface HeaderProps {
    dashboard: Dashboard
    onChange: any
}
const DashboardHeader = memo(({ dashboard, onChange }: HeaderProps) => {
    const router = useRouter()
    
    const [variablesChanged, setVariablesChanged] = useState(0)
    const [refresh, setRefresh] = useState(0)
    const [team, setTeam] = useState<Team>(null)
    const miniMode = useMiniMode()
    const fullscreen = useFullscreen()

    useEffect(() => {
        getTeam()
    }, [])

    const getTeam = async () => {
        const res1 = await requestApi.get(`/team/${dashboard.ownedBy}`)
        setTeam(res1.data)
    }

    const refreshH = useRef(null)

    useEffect(() => {
        if (refresh > 0) {
            refreshH.current = setInterval(() => {
                refreshOnce()
            }, 1000 * refresh)
        } else {
            clearInterval(refreshH.current)
        }

        return () => {
            clearInterval(refreshH.current)
        }
    }, [refresh])

    const refreshOnce = () => {
        const tr = getInitTimeRange()
        if (tr.sub > 0) {
            const now = new Date()
            tr.start = subMinutes(now, tr.sub)
            tr.end = now
            storage.set(TimePickerKey, JSON.stringify(tr))
            dispatch({type:  TimeChangedEvent,data: tr})
        }
    }
    useBus(
        VariableChangedEvent,
        () => {
            console.log("dash header recv variable change event:", variables);
            setVariablesChanged(variablesChanged + 1)
        },
        [variablesChanged]
    )
    


    return (
        <Box display={fullscreen ? "none" : "block"} py="1" width={`calc(100% - ${miniMode ? 76 : 148}px)`} position="fixed" bg={dashboard.data.styles?.bg ? 'transparent' : 'var(--chakra-colors-chakra-body-bg)'} zIndex={1}>
            {team &&
                <>
                    <Flex justifyContent="space-between" >
                        <HStack textStyle="title">
                            <Tooltip label="the team which current dashboard belongs to"><Box cursor="pointer" onClick={() => router.push(`${ReserveUrls.Config}/team/${team.id}/members`)}>{team?.name}</Box></Tooltip>
                            <Box>/</Box>
                            <Box>{dashboard.title}</Box>
                        </HStack>

                        <HStack mr="2">
                            <HStack spacing="1">
                                <AddPanel dashboard={dashboard} onChange={onChange} />
                                <DashboardSave dashboard={dashboard} />
                                {dashboard && <DashboardSettings dashboard={dashboard} onChange={onChange} />}
                                <DatePicker />
                                <HStack spacing={0}>
                                    <Tooltip label="refresh just once"><Box onClick={refreshOnce}><IconButton variant="ghost"><MdSync /></IconButton></Box></Tooltip>
                                    <Tooltip label="refresh with interval"><Select variant="unstyled" value={refresh} onChange={(e) => setRefresh(Number(e.target.value))}>
                                        <option value={0}>OFF</option>
                                        <option value={5}>5s</option>
                                        <option value={10}>10s</option>
                                        <option value={30}>30s</option>
                                        <option value={60}>1m</option>
                                    </Select></Tooltip>
                                </HStack>
                                <Fullscreen />

                            </HStack>

                        </HStack>

                    </Flex>
                    {!isEmpty(variables) && <Flex justifyContent="space-between" mt="0">
                        <SelectVariables id={variablesChanged} variables={variables.filter((v) => v.id.toString().startsWith("d-"))} />
                        <SelectVariables id={variablesChanged} variables={variables.filter((v) => !v.id.toString().startsWith("d-") && !find(dashboard.data.hidingVars?.split(','), v1 => v1 == v.name))} />
                    </Flex>}
                </>}
        </Box>
    )
})

export default DashboardHeader