module.exports = () => ({
    "name": "",
    "externalId": "",
    "realmName": "retail",
    "parentExternalId": "SBG-BANK",
    "legalEntityType": "CUSTOMER",
    "users": [
        {
            "user": {
                "externalId": "",
                "fullName": "",
                "identityLinkStrategy": "CREATE_IN_IDENTITY",
                "emailAddress": {
                    "address": ""
                },
                "mobileNumber": {
                    "number": ""
                }
            },
            "referenceJobRoleNames": [
                "Retail User Job"
            ]
        }
    ],
    "referenceJobRoles": [
        {
            "name": "Retail User Job",
            "description": "Retail User Job",
            "functionGroups": [
                {
                    "name": "Retail User Job",
                    "functions": [
                        {
                            "functionId": "1006",
                            "functionCode": "product.summary",
                            "privileges": [
                                {
                                    "privilege": "view"
                                },
                                {
                                    "privilege": "edit"
                                }
                            ]
                        },
                        {
                            "functionId": "1003",
                            "functionCode": "transactions",
                            "privileges": [
                                {
                                    "privilege": "view"
                                }
                            ]
                        },
                        {
                            "functionId": "sbg.1001",
                            "functionCode": "sbg.self.payment",
                            "privileges": [
                                {
                                    "privilege": "view"
                                },
                                {
                                    "privilege": "create"
                                },
                                {
                                    "privilege": "edit"
                                },
                                {
                                    "privilege": "delete"
                                },
                                {
                                    "privilege": "approve"
                                }
                            ]
                        },
                        {
                            "functionId": "sbg.1002",
                            "functionCode": "sbg.within.payment",
                            "privileges": [
                                {
                                    "privilege": "view"
                                },
                                {
                                    "privilege": "create"
                                },
                                {
                                    "privilege": "edit"
                                },
                                {
                                    "privilege": "delete"
                                },
                                {
                                    "privilege": "approve"
                                }
                            ]
                        },
                        {
                            "functionId": "sbg.1003",
                            "functionCode": "sbg.other.payment",
                            "privileges": [
                                {
                                    "privilege": "view"
                                },
                                {
                                    "privilege": "create"
                                },
                                {
                                    "privilege": "edit"
                                },
                                {
                                    "privilege": "delete"
                                },
                                {
                                    "privilege": "approve"
                                }
                            ]
                        },
                        {
                            "functionId": "sbg.1004",
                            "functionCode": "sbg.mobile.payment",
                            "privileges": [
                                {
                                    "privilege": "view"
                                },
                                {
                                    "privilege": "create"
                                },
                                {
                                    "privilege": "edit"
                                },
                                {
                                    "privilege": "delete"
                                },
                                {
                                    "privilege": "approve"
                                }
                            ]
                        },
                        {
                            "functionId": "1005",
                            "functionCode": "contacts",
                            "privileges": [
                                {
                                    "privilege": "view"
                                },
                                {
                                    "privilege": "create"
                                },
                                {
                                    "privilege": "edit"
                                },
                                {
                                    "privilege": "delete"
                                },
                                {
                                    "privilege": "approve"
                                }
                            ]
                        },
                        {
                            "functionId": "1016",
                            "functionCode": "manage.statements",
                            "privileges": [
                                {
                                    "privilege": "view"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    "productGroups": [
        {
            "productGroupType": "ARRANGEMENTS",
            "name": "",
            "users": [
                {
                    "user": {
                        "externalId": "",
                        "fullName": "",
                        "identityLinkStrategy": "CREATE_IN_IDENTITY",
                        "emailAddress": {
                            "address": ""
                        },
                        "mobileNumber": {
                            "number": ""
                        }
                    },
                    "referenceJobRoleNames": [
                        "Retail User Job"
                    ]
                }
            ],
            "currentAccounts": [],
            "savingAccounts": [],
            "investmentAccounts": [],
            "loans": [],
            "creditCards": []
        }
    ]
})