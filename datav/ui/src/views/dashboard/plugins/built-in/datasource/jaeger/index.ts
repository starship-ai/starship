/* 
This panel is for demonstration purpose, it is an external plugin, auto generated by xobserve.

The origin plugin files is in https://github.com/xObserve/xobserve/tree/main/ui/external-plugins
*/

// This demo datasource is just a copy of Promtheus datasource
import { DatasourcePluginComponents } from "types/plugin";
import DatasourceEditor from "./DatasourceEditor";
import VariableEditor from "./VariableEditor";
import QueryEditor from "./QueryEditor";
import { DatasourceTypeJaeger } from "./types"
import icon from './icon.svg'
import { checkAndTestJaeger, queryJaegerVariableValues, replaceJaegerQueryWithVariables, run_jaeger_query } from "./query_runner";

const components: DatasourcePluginComponents = {
    datasourceEditor: DatasourceEditor,
    variableEditor:VariableEditor,
    queryEditor: QueryEditor,

    // defined in query_runner.ts
    runQuery: run_jaeger_query,
    testDatasource: checkAndTestJaeger,
    replaceQueryWithVariables: replaceJaegerQueryWithVariables,
    queryVariableValues: queryJaegerVariableValues,

    settings:{
        type: DatasourceTypeJaeger,
        icon,
    }
}

export default  components