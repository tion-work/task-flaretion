import { companyConfig } from '../config/company';

interface CopyrightProps {
  companyName?: string;
  appName?: string;
  showAppName?: boolean;
}

export default function Copyright({ 
  companyName = companyConfig.name, 
  appName = companyConfig.appName,
  showAppName = false
}: CopyrightProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="text-center mt-8 text-sm text-gray-500">
      <p>
        © {currentYear} {companyName}
        {showAppName && ` - ${appName}`}. {companyConfig.copyright}
      </p>
    </div>
  );
}
