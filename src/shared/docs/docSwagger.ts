/* eslint-disable import/prefer-default-export */
export const swaggerDocument = {
  swagger: '2.0',
  info: {
    description: 'This is a server to Grade Control.',
    version: '1.0.0',
    title: 'Swagger Grade Control',
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      email: 'cmtehenz@gmail.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  host: 'gradecontrol.swagger.io',
  basePath: '/v2',
  tags: [
    {
      name: 'grade',
      description: 'Control your grades',
      externalDocs: {
        description: 'Find out more',
        url: 'http://swagger.io',
      },
    },
  ],
  schemes: ['https'],
  paths: {
    '/grade/create': {
      post: {
        tags: ['grade'],
        summary: 'Create a grade',
        description: 'Creates a new grade based on the JSON body',
        operationId: 'createGrade',
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Created user object',
            required: true,
            schema: {
              $ref: '#/definitions/NewGrade',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Successful operation!',
            schema: {
              $ref: '#/definitions/Grade',
            },
          },
          '400': {
            description:
              'These parameters are required: student, subject, type,value!',
          },
        },
      },
    },
    '/grade/{id}': {
      get: {
        tags: ['grade'],
        summary: 'Get grade',
        description: 'Gets a grade based on the id',
        operationId: 'getGradeById',
        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'Successful operation!',
            schema: {
              $ref: '#/definitions/Grade',
            },
          },
          '400': {
            description: 'The id does not exist!',
          },
          '404': {
            description: 'The id is required!',
          },
        },
      },
    },
    '/grade/totalGrade/{student}/{subject}': {
      get: {
        tags: ['grade'],
        summary: "Gets total grade's value",
        description:
          "Gets total grade's value, based on the student and the subject",
        operationId: 'getTotalGradeByStudentSubject',
        produces: ['application/json'],
        parameters: [
          {
            name: 'student',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            name: 'subject',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'The sum of {student} in {subject} is: {totalGrade}',
          },
          '404': {
            description: 'These parameters are required: student, subject!',
          },
        },
      },
    },
    '/grade/meanGrade/{subject}/{type}': {
      get: {
        tags: ['grade'],
        summary: "Gets mean grade's value",
        description:
          "Gets mean grade's value, based on the subject and the type",
        operationId: 'getTotalGradeBySubjectType',
        produces: ['application/json'],
        parameters: [
          {
            name: 'subject',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            name: 'type',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'The mean of {subject} in {type} is: {meanGrade}',
          },
          '404': {
            description: 'These parameters are required: subject, type!',
          },
        },
      },
    },
    '/grade/threeBestGrades/{subject}/{type}': {
      get: {
        tags: ['grade'],
        summary: "Gets best three grade's value",
        description:
          "Gets best three grade's value, based on the subject and the type",
        operationId: 'getThreeBestGradeBySubjectType',
        produces: ['application/json'],
        parameters: [
          {
            name: 'subject',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            name: 'type',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'The mean of {subject} in {type} is: {meanGrade}',
          },
          '404': {
            description: 'These parameters are required: subject, type!',
          },
        },
      },
    },
    '/grade/delete/{id}': {
      delete: {
        tags: ['grade'],
        summary: 'Delete grade',
        description: "Deletes a grade, based on the grade's id",
        operationId: 'deleteGradeById',
        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'User deleted successfully!',
          },
          '400': {
            description: 'This id does not exist!',
          },
          '404': {
            description: 'The id is required!',
          },
        },
      },
    },
    '/grade/updateGrade/{id}': {
      patch: {
        tags: ['grade'],
        summary: 'Update a grade',
        description: "Updates a grade, based on the grade's id",
        operationId: 'updateGradeById',
        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            in: 'body',
            name: 'body',
            description: 'Update a user object',
            required: true,
            schema: {
              $ref: '#/definitions/NewGrade',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Successful operation!',
            schema: {
              $ref: '#/definitions/Grade',
            },
          },
          '400': {
            description: 'This id does not exist!',
          },
          '404': {
            description: 'The id is required!',
          },
        },
      },
    },
  },
  definitions: {
    Grade: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        student: {
          type: 'string',
        },
        subject: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
        value: {
          type: 'integer',
          format: 'int64',
        },
        timestamp: {
          type: 'string',
          format: 'date-time',
        },
      },
    },
    NewGrade: {
      type: 'object',
      properties: {
        student: {
          type: 'string',
        },
        subject: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
        value: {
          type: 'integer',
          format: 'int64',
        },
      },
    },
  },
  externalDocs: {
    description: 'Find out more about Swagger',
    url: 'http://swagger.io',
  },
};
