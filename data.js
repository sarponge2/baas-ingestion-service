
module.exports = {

    payload: () => ({
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
        "referenceJobRoles": [],
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
                ]
            }
        ]
    }),

    userJobRoles: () => [
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

    adminJobRoles: () => [
        {
            "name": "Employee Portal",
            "description": "Employee Portal Permissions",
            "functionGroups": [
                {
                    "name": "Employee Portal",
                    "functions": [
                        {
                            "functionId": "1038",
                            "functionCode": "manage.messages",
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
                            "functionId": "1031",
                            "functionCode": "manage.topics",
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
                                    "privilege": "execute"
                                }
                            ]
                        },
                        {
                            "functionId": "1049",
                            "functionCode": "lock.user",
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
                                    "privilege": "approve"
                                }
                            ]
                        },
                        {
                            "functionId": "1050",
                            "functionCode": "unlock.user",
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
                                    "privilege": "approve"
                                }
                            ]
                        },
                        {
                            "functionId": "1034",
                            "functionCode": "manage.identities",
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
                                    "privilege": "approve"
                                }
                            ]
                        },
                        {
                            "functionId": "1066",
                            "functionCode": "manage.other.users.devices",
                            "privileges": [
                                {
                                    "privilege": "view"
                                },
                                {
                                    "privilege": "edit"
                                },
                                {
                                    "privilege": "delete"
                                }
                            ]
                        },
                        {
                            "functionId": "1051",
                            "functionCode": "manage.devices",
                            "privileges": [
                                {
                                    "privilege": "view"
                                },
                                {
                                    "privilege": "edit"
                                },
                                {
                                    "privilege": "delete"
                                }
                            ]
                        },
                        {
                            "functionId": "1036",
                            "functionCode": "support.access.payments",
                            "privileges": [
                                {
                                    "privilege": "view"
                                }
                            ]
                        },
                        {
                            "functionId": "1076",
                            "functionCode": "act.on.behalf.of",
                            "privileges": [
                                {
                                    "privilege": "execute"
                                }
                            ]
                        },
                        {
                            "functionId": "1075",
                            "functionCode": "emulate",
                            "privileges": [
                                {
                                    "privilege": "execute"
                                },
                                {
                                    "privilege": "view"
                                }
                            ]
                        },
                        {
                            "functionId": "1013",
                            "functionCode": "audit",
                            "privileges": [
                                {
                                    "privilege": "view"
                                },
                                {
                                    "privilege": "create"
                                }
                            ]
                        },
                        {
                            "functionId": "1019",
                            "functionCode": "manage.data.groups",
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
                            "functionId": "1020",
                            "functionCode": "manage.function.groups",
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
                            "functionId": "1007",
                            "functionCode": "assign.users",
                            "privileges": [
                                {
                                    "privilege": "view"
                                },
                                {
                                    "privilege": "create"
                                },
                                {
                                    "privilege": "edit"
                                }
                            ]
                        },
                        {
                            "functionId": "1009",
                            "functionCode": "assign.permissions",
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
                                    "privilege": "approve"
                                }
                            ]
                        },
                        {
                            "functionId": "1010",
                            "functionCode": "manage.users",
                            "privileges": [
                                {
                                    "privilege": "view"
                                }
                            ]
                        },
                        {
                            "functionId": "1011",
                            "functionCode": "manage.legalentities",
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
                            "functionId": "1028",
                            "functionCode": "manage.service.agreements",
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
                        }
                    ]
                }
            ]
        }
    ]

}
