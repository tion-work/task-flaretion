// 公司配置信息
export const companyConfig = {
  // 公司名称
  name: "Flaretion",
  
  // 应用名称
  appName: "TaskMaster",
  
  // 公司网站
  website: "https://flaretion.com",
  
  // 公司描述
  description: "专业的项目管理平台",
  
  // 版权信息
  copyright: "All rights reserved.",
  
  // 联系信息
  contact: {
    email: "contact@flaretion.com",
    support: "support@flaretion.com"
  }
};

// 获取版权文本
export function getCopyrightText() {
  const currentYear = new Date().getFullYear();
  return `© ${currentYear} ${companyConfig.name}. ${companyConfig.copyright}`;
}

// 获取完整版权信息
export function getFullCopyrightInfo() {
  return {
    year: new Date().getFullYear(),
    company: companyConfig.name,
    app: companyConfig.appName,
    copyright: companyConfig.copyright
  };
}
