const toggleWithoutAnimation = state => state.app.sidebar.withoutAnimation;
const config = state => state.app.config;
const palette = state => state.app.config.palette;
const isLoading = state => state.app.isLoading;

const isLoggedIn = state => !!state.auth.token;
const authStatus = state => state.auth.status;
const profile = state => state.profile;
const profileRole = state => state.profile.role;
const isSuperAdmin = state => state.profile.role === 'SUDO';
const isOperator = state => state.profile.role === 'OPERATOR';
const adminName = state => state.profile.email;
const adminId = state => state.profile.id;

const isAjaxLoading = state => state.ajax.isLoading;

export { toggleWithoutAnimation, config, palette, isLoading, isAjaxLoading, isLoggedIn, authStatus, isSuperAdmin, isOperator, adminName, adminId, profileRole, profile };
