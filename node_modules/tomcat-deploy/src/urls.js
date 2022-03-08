export const getOptionsFromConfig = (method, path, {
  hostname,
  login,
  password,
  port,
  protocol,
}) => ({
  auth: `${login}:${password}`,
  hostname,
  method,
  path,
  port,
  protocol,
});

export default { getOptionsFromConfig };
