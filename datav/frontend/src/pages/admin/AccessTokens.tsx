// Copyright 2023 xobserve.io Team
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

import { useStore } from '@nanostores/react'
import Page from 'layouts/page/Page'
import React, { memo } from 'react'
import { commonMsg, websiteAdmin } from 'src/i18n/locales/en'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'

import { getAdminLinks } from './links'
import AccessTokenManage from 'src/views/accesstoken/AccessTokenManage'
import { Scope } from 'types/scope'
export const AdminAccessTokens = memo(() => {
  const t = useStore(commonMsg)
  const t1 = useStore(websiteAdmin)

  const adminLinks = getAdminLinks()

  return (
    <Page
      title={t1.websiteAdmin}
      subTitle={t.manageItem({ name: t.auditLog })}
      icon={<MdOutlineAdminPanelSettings />}
      tabs={adminLinks}
    >
      <AccessTokenManage scope={Scope.Website} scopeId={'0'} hidenTitle />
    </Page>
  )
})

export default AdminAccessTokens
