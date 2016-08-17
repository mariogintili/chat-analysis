import json
import sqlalchemy
import pandas

def __build_connection():
  with open('../config/config.json') as data_file:
    config = json.load(data_file)
    return sqlalchemy.create_engine('postgres://' + config['development']['username'] + '@localhost/' + config['development']['database']).connect()

def build_dataframe(query):
  return pandas.read_sql(query, __build_connection())

def conversations_abandoned_chart():
  dataframe = build_dataframe('SELECT * from conversations;')
  print 'Total number of 24/7 chats that were open are'
  print dataframe.shape[0]
  print "Out that number, we can see that only a proportion of them actually started"
  conversationsDict = { 'started': 0, 'failed': 0 }

  for convo in dataframe['conversation']:
      if len(json.loads(convo)) > 0:
          conversationsDict['started'] = conversationsDict['started'] + 1
      else:
          conversationsDict['failed'] = conversationsDict['failed'] + 1

  conversationHappenedSeries = pandas.Series([conversationsDict['started'], conversationsDict['failed']], index=['started', 'abandoned'], name='24/7 Usage')
  print conversationHappenedSeries;
  return conversationHappenedSeries.plot.pie(labels=['Started', 'Abandoned'], colors=['b', 'r'], autopct='%.2f', fontsize=20, figsize=(6, 6))


def conversations_abandoned_by_referral_platform():
  dataframe = build_dataframe('SELECT * from conversations;')
