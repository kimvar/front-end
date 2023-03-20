import { user } from "@utils";

const PermissionGuard = ({ children, has }) => {
  const _permissions = user.credantials.permissions || [];

  if (_permissions.includes(has)) {
    return children;
  }

  return null;
};

export default PermissionGuard;
