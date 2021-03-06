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
  conversations_dict = { 'started': 0, 'failed': 0 }

  for convo in dataframe['conversation']:
      if len(json.loads(convo)) > 0:
          conversations_dict['started'] = conversations_dict['started'] + 1
      else:
          conversations_dict['failed'] = conversations_dict['failed'] + 1

  conversation_happened_series = pandas.Series([conversations_dict['started'], conversations_dict['failed']], index=['started', 'abandoned'], name='24/7 Usage')
  print conversation_happened_series;
  return conversation_happened_series.plot.pie(labels=['Started', 'Abandoned'], colors=['b', 'r'], autopct='%.2f', fontsize=20, figsize=(6, 6))


def conversations_by_referral_platform():
  dataframe   = build_dataframe('SELECT * from conversations;')
  labels      = list(build_dataframe('SELECT DISTINCT queue from conversations;')['queue'])
  labels_dict = {}

  # initialize dict
  for label in labels:
    labels_dict[label] = 0

  for _row in dataframe.iterrows():
    row = _row[1]
    labels_dict[row['queue']] = labels_dict[row['queue']] + 1

  series = pandas.Series(labels_dict.values(), index=labels, name='Chats by referral queue')
  return series.plot.pie(labels=labels, fontsize=8, figsize=[10, 10], labeldistance=3)
