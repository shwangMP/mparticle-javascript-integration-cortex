/*
The 'mParticleUser' is an object with methods get user Identities and set/get user attributes
Partners can determine what userIds are available to use in their SDK
Call mParticleUser.getUserIdentities() to return an object of userIdentities --> { userIdentities: {customerid: '1234', email: 'email@gmail.com'} }
For more identity types, see https://docs.mparticle.com/developers/sdk/web/idsync/#supported-identity-types
Call mParticleUser.getMPID() to get mParticle ID
For any additional methods, see https://docs.mparticle.com/developers/sdk/web/core-apidocs/classes/mParticle.Identity.getCurrentUser().html
*/

/*
identityApiRequest has the schema:
{
  userIdentities: {
    customerid: '123',
    email: 'abc'
  }
}
For more userIdentity types, see https://docs.mparticle.com/developers/sdk/web/idsync/#supported-identity-types
*/

function IdentityHandler(common) {
    this.common = common || {};
}
IdentityHandler.prototype.onUserIdentified = function(mParticleUser) {
    vidora.push(['setUserId',mParticleUser.getMPID()])
};
IdentityHandler.prototype.onIdentifyComplete = function(
    mParticleUser,
    identityApiRequest
) {
    vidora.push(['setUserId',mParticleUser.getMPID()])
};
IdentityHandler.prototype.onLoginComplete = function(
    mParticleUser,
    identityApiRequest
) {
    vidora.push(['setUserId',mParticleUser.getMPID()])
};
IdentityHandler.prototype.onLogoutComplete = function(
    mParticleUser,
    identityApiRequest
) {};
IdentityHandler.prototype.onModifyComplete = function(
    mParticleUser,
    identityApiRequest
) {
    vidora.push(['setUserId',mParticleUser.getMPID()])
};

/*  In previous versions of the mParticle web SDK, setting user identities on
    kits is only reachable via the onSetUserIdentity method below. We recommend
    filling out `onSetUserIdentity` for maximum compatibility
*/
IdentityHandler.prototype.onSetUserIdentity = function(
    forwarderSettings,
    id,
    type
) {};

module.exports = IdentityHandler;
