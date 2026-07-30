import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

const imports = [
  "import { StarredMessagesScreen } from './screens/StarredMessagesScreen';",
  "import { LinkedDevicesScreen } from './screens/LinkedDevicesScreen';",
  "import { ReportFeedbackScreen } from './screens/ReportFeedbackScreen';"
];

for (const imp of imports) {
  if (!content.includes(imp)) {
    content = content.replace(
      "import { DataUsageScreen } from './screens/DataUsageScreen';",
      "import { DataUsageScreen } from './screens/DataUsageScreen';\n" + imp
    );
  }
}

const renders = [
  "{currentScreen === 'starred_messages' && <StarredMessagesScreen onNavigate={navigateTo} />}",
  "{currentScreen === 'linked_devices' && <LinkedDevicesScreen onNavigate={navigateTo} />}",
  "{currentScreen === 'report_feedback' && <ReportFeedbackScreen onNavigate={navigateTo} />}"
];

for (const render of renders) {
  if (!content.includes(render.substring(0, 30))) {
    content = content.replace(
      "{currentScreen === 'data_usage' && (",
      render + "\n        {currentScreen === 'data_usage' && ("
    );
  }
}

fs.writeFileSync('src/App.tsx', content);
