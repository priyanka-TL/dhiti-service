const Uuid = require('cassandra-driver').types.Uuid;
const config = require('../config/config');

module.exports = {
  async up(db) {
    global.migrationMsg = "Insert survey solutions report query";
    
    
    if (!cassandra) {
      throw new Error("Cassandra connection not available.");
    }

    const query = 'SELECT id FROM ' + config.cassandra.keyspace + '.' + config.cassandra.table + ' WHERE qid = ? ALLOW FILTERING';
    const result = await cassandra.execute(query, ['survey_solutions_report_query'], { prepare: true });
    const row = result.rows;

    if (!row.length) {

    let id = Uuid.random();

    let query = 'INSERT INTO ' + config.cassandra.keyspace + '.' + config.cassandra.table +' (id, qid, query) VALUES (?, ?, ?)';
   
    let queries = 
      [{
        query: query,
        params: [id.toString(), 'survey_solutions_report_query','{"queryType":"groupBy","dataSource":"sl_survey","granularity":"all","dimensions":["surveySubmissionId","solutionId","solutionName","questionName","questionAnswer","remarks","surveyId","questionResponseType","questionResponseLabel","questionId","questionExternalId","instanceId","instanceParentQuestion","instanceParentResponsetype","instanceParentId","instanceParentExternalId","instanceParentEcmSequence","completedDate"],"filter":{"type":"and","fields":[{"type":"selector","dimension":"solutionId","value":""},{"type":"selector","dimension":"questionResponseType","value":""},{"type":"not","field": {"type":"selector","dimension":"questionAnswer","value":""}}]},"aggregations":[],"postAggregations":[],"intervals":["1901-01-01T00:00:00+00:00/2101-01-01T00:00:0+00:00"]}']
      }];

      await cassandra.batch(queries, { prepare: true });

      }
      
      return global.migrationMsg;
      },

      async down(db) {
        // return await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
      }
    };