// Script on the READ ACL (u_institution_details, operation=read, Advanced=true)
// Requires role: bb1   |   Condition: Branch is EEE (u_branch=EEE)
(function () {
    // Allow admin users full access
    if (gs.hasRole('admin')) {
        return true;
    }
    // Allow only EEE branch users to see EEE records
    if (gs.hasRole('bb1')){
        return true;
    }
    // Deny access for all others
    return false;
})();
