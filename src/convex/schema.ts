import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // Algorithm Platform Tables
    algorithms: defineTable({
      name: v.string(),
      slug: v.string(),
      category: v.string(),
      domain: v.string(),
      description: v.string(),
      intuition: v.string(),
      pseudocode: v.string(),
      implementation: v.string(),
      language: v.string(),
      timeComplexity: v.object({
        best: v.string(),
        average: v.string(),
        worst: v.string(),
      }),
      spaceComplexity: v.string(),
      applications: v.array(v.string()),
      advantages: v.array(v.string()),
      disadvantages: v.array(v.string()),
      relatedAlgorithms: v.array(v.string()),
      difficulty: v.string(),
      tags: v.array(v.string()),
      visualizationType: v.string(),
      researchReferences: v.array(v.string()),
      yearIntroduced: v.optional(v.number()),
      inventor: v.optional(v.string()),
    })
      .index("by_slug", ["slug"])
      .index("by_category", ["category"])
      .index("by_domain", ["domain"])
      .index("by_difficulty", ["difficulty"]),

    benchmarks: defineTable({
      algorithmId: v.id("algorithms"),
      userId: v.optional(v.id("users")),
      datasetSize: v.number(),
      datasetType: v.string(),
      executionTime: v.number(),
      memoryUsage: v.number(),
      cpuUsage: v.number(),
      testCase: v.string(),
      result: v.string(),
      metadata: v.object({
        os: v.string(),
        runtime: v.string(),
        timestamp: v.number(),
      }),
    })
      .index("by_algorithm", ["algorithmId"])
      .index("by_user", ["userId"]),

    visualizations: defineTable({
      algorithmId: v.id("algorithms"),
      userId: v.optional(v.id("users")),
      steps: v.array(
        v.object({
          stepNumber: v.number(),
          description: v.string(),
          state: v.string(),
          highlightedCode: v.optional(v.string()),
          variables: v.optional(v.string()),
        }),
      ),
      inputData: v.string(),
      outputData: v.string(),
    }).index("by_algorithm", ["algorithmId"]),

    learningPaths: defineTable({
      title: v.string(),
      description: v.string(),
      difficulty: v.string(),
      estimatedHours: v.number(),
      algorithmIds: v.array(v.id("algorithms")),
      prerequisites: v.array(v.string()),
      learningObjectives: v.array(v.string()),
      milestones: v.array(
        v.object({
          title: v.string(),
          description: v.string(),
          algorithmIds: v.array(v.id("algorithms")),
        }),
      ),
    }).index("by_difficulty", ["difficulty"]),

    userProgress: defineTable({
      userId: v.id("users"),
      algorithmId: v.id("algorithms"),
      status: v.string(),
      completedAt: v.optional(v.number()),
      timeSpent: v.number(),
      visualizationsViewed: v.number(),
      benchmarksRun: v.number(),
      notes: v.optional(v.string()),
    })
      .index("by_user", ["userId"])
      .index("by_algorithm", ["algorithmId"])
      .index("by_user_and_algorithm", ["userId", "algorithmId"]),

    recommendations: defineTable({
      userId: v.id("users"),
      problemDescription: v.string(),
      constraints: v.object({
        inputSize: v.string(),
        timeConstraint: v.string(),
        spaceConstraint: v.string(),
        environment: v.string(),
      }),
      recommendedAlgorithms: v.array(
        v.object({
          algorithmId: v.id("algorithms"),
          score: v.number(),
          reasoning: v.string(),
          tradeoffs: v.string(),
        }),
      ),
      timestamp: v.number(),
    }).index("by_user", ["userId"]),

    community: defineTable({
      userId: v.id("users"),
      algorithmId: v.id("algorithms"),
      type: v.string(),
      content: v.string(),
      rating: v.optional(v.number()),
      upvotes: v.number(),
      downvotes: v.number(),
    })
      .index("by_algorithm", ["algorithmId"])
      .index("by_user", ["userId"])
      .index("by_type", ["type"])
  },
  {
    schemaValidation: false,
  },
);

export default schema;
