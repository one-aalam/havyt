const userConfig = {
    passRegex: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$',
    passDefault: 'Pa33w0rd!',
    passSaltRounds: 10
    /*
    This regex will enforce these rules:
        At least one upper case English letter, (?=.*?[A-Z])
        At least one lower case English letter, (?=.*?[a-z])
        At least one digit, (?=.*?[0-9])
        At least one special character, (?=.*?[#?!@$%^&*-])
        Minimum eight in length .{8,} (with the anchors)
        Maximum fifteen in length .{,15} (with the anchors)
    */
}

export default userConfig
