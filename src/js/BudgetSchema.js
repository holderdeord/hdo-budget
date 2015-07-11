import {
        graphql,
        GraphQLSchema,
        GraphQLObjectType,
        GraphQLInterfaceType,
        GraphQLString,
        GraphQLNonNull,
        GraphQLList,
        GraphQLInt,
} from 'graphql';

/*
    interface BudgetCreator {
        id: String!
        name: String!
    }

    type Party : BudgetCreator {
        id: String!,
        name: String!
    }

    type Government : BudgetCreator {
        id: String!,
        name: String!
        parties: [Party]
    }

    type BudgetPost {
        id: String!
        description: String,
        amount: Int
    }

    type BudgetChapter {
        id: String!,
        name: String!,
        posts: [BudgetPost]
    }

    type BudgetFrame {
        id: String!,
        name: String!,
        chapters: [BudgetChapter]
    }

    type Budget {
        id: String!
        name: String!
        year: Int      # should maybe be date?
        creator: BudgetCreator
        frames: [BudgetFrame]
    }
*/

export function getSchema(db) {
    const budgetCreatorInterface = new GraphQLInterfaceType({
        name: 'BudgetCreator',
        description: 'An entity that proposes a budget. Usually a party or a government.',
        fields: () => ({
            id: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'The id of the budget creator.'
            },
            name: {
                type: GraphQLString,
                description: 'The name of the budget creator.'
            }
        }),
        resolveType: (obj) => {
            throw new Error(`not implemented: BudgetCreatorType.resolveType(${obj})`);
        }
    });

    const partyType = new GraphQLObjectType({
        name: 'Party',
        description: 'A politial party.',

        fields: () => ({
            id: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'The id of the party.'
            },

            name: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'The name of the party'
            }
        }),
        interfaces: [budgetCreatorInterface]
    });

    const governmentType = new GraphQLObjectType({
        name: 'Government',
        description: 'A government consisting of one or more parties.',

        fields: () => ({
            id: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'The id of the party.'
            },

            name: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'The name of the party'
            },

            parties: {
                type: new GraphQLList(partyType),
                description: 'The parties in this government.'
            }
        }),

        interfaces: [budgetCreatorInterface]
    });

    const budgetPostType = new GraphQLObjectType({
        name: 'BudgetPost',
        description: 'A post in a budget.',

        fields: () => ({
            id: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'The id of the post.'
            },

            description: {
                type: GraphQLString,
                description: 'A description of the post.'
            },

            amount: {
                type: GraphQLInt,
                description: 'The amount of the post.'
            }
        }),
    });

    const budgetChapterType = new GraphQLObjectType({
        name: 'BudgetChapter',
        description: 'A chapter in a budget.',

        fields: () => ({
            id: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'The id of the chapter.'
            },

            name: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'The name of the chapter.'
            },

            posts: {
                type: new GraphQLList(budgetPostType),
                description: 'The posts in this frame.'
            }
        }),
    });

    const budgetFrameType = new GraphQLObjectType({
        name: 'BudgetFrame',
        description: 'A frame in a budget.',

        fields: () => ({
            id: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'The id of the frame.'
            },

            name: {
                type: GraphQLString,
                description: 'The name of the frame.'
            },

            chapters: {
                type: new GraphQLList(budgetChapterType),
                description: 'The chapters in this frame.'
            }
        }),
    });

    const budgetType = new GraphQLObjectType({
        name: 'Budget',
        description: 'A budget',
        fields: () => ({
            id: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'The id of the budget.'
            },
            name: {
                type: GraphQLString,
                description: 'The name of the budget.'
            },
            creator: {
                type: budgetCreatorInterface,
                description: 'The creator of the budget.'
            },
            year: {
                type: GraphQLInt,
                description: 'The budget year.'
            },
            frames: {
                type: new GraphQLList(budgetFrameType),
                description: 'The frames in the budget.'
            }
        })
    });

    const queryType = new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            budgets: {
                type: new GraphQLList(budgetType),
                resolve: () => db.allBudgets()
            },

            budget: {
                type: budgetType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (root, {id}) => db.getBudgetById(id)
            }
        })
    });

    return new GraphQLSchema({ query: queryType });
}

