/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardDelivery from './views/Dashboard';
import MessageCenter from './views/MessageCenter';
import StreamingWall from './views/StreamingWall';
import BatchRegister from './views/BatchRegister';
import BatchPublish from './views/BatchPublish';
import BatchNurture from './views/BatchNurture';
import ReferenceLibrary from './views/ReferenceLibrary';
import PublishedTracker from './views/PublishedTracker';
import AccountAssets from './views/AccountAssets';
import TaskCenter from './views/TaskCenter';
import DataCenter from './views/DataCenter';
import SmartEditor from './views/SmartEditor';

// Simple placeholder for unimplemented pages
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex h-full items-center justify-center flex-col text-gray-400">
    <div className="text-6xl mb-4 font-light text-gray-200">🛠</div>
    <h2 className="text-xl font-medium text-gray-600">{title} 功能开发中</h2>
    <p className="mt-2 text-sm">轻量版目前聚焦核心场景，更多功能即将上线</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardDelivery />} />
          <Route path="messages" element={<MessageCenter />} />
          <Route path="streaming" element={<StreamingWall />} />
          <Route path="register" element={<BatchRegister />} />
          <Route path="publish" element={<BatchPublish />} />
          <Route path="nurture" element={<BatchNurture />} />
          <Route path="library" element={<ReferenceLibrary />} />
          <Route path="tracking" element={<PublishedTracker />} />
          <Route path="assets" element={<AccountAssets />} />
          <Route path="tasks" element={<TaskCenter />} />
          <Route path="data" element={<DataCenter />} />
          <Route path="editor" element={<SmartEditor />} />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
