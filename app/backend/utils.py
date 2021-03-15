import pymysql.cursors

def createNotebook(name):
   
  try: 
    print(f'hello create {str(name)}') 
    connection = pymysql.connect(host='db', user='root', password='root', db='pigments', charset='utf8')

    with connection.cursor() as cursor: 
      print(f'cursor: {str(cursor)}')
      sql = "INSERT INTO `notebook` (`name`) VALUES (%s)"
      cursor.execute(sql, (name)) 
      print(f'connection: {str(connection)}')
      notebookId = cursor.lastrowid
 
      print(f'notebookId: {str(notebookId)}') 
    
    connection.commit()

    # return 'done'
    return notebookId
  
  except Exception as e:
    print(e)
    return None
  
  finally:
    connection.close()
