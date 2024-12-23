import eel
import json

todo_count = 0  #number of  todo stored

eel.init("gui")

# read_data will allow app to read data from data.json file
def read_data():
    with open("data.json", "r") as file:
        content = json.load(file)
    return content

# write_data will write data into data.json file
def write_data(content):
    with open("data.json", "w") as file:
        file.write(json.dumps(content))
    return content

# create a new_todo and save it in content
@eel.expose
def create_todo(title):
    global todo_count

    new_todo = {
        "id" : todo_count + 1,
        "title" : title
    }

    content = read_data()
    content['todos'].append(new_todo)

    write_data(content)
    todo_count += 1

    return new_todo

@eel.expose
def list_todo():
    return read_data()

# delete todo by id
@eel.expose
def delete_todo(id):
    global todo_count

    content = read_data()

    for todo in content['todos']:
        if todo['id'] == id:
            content['todos'].remove(todo)
    
    write_data(content)
    todo_count -= 1

# create data.json with empty todos list if not present yet.
# otherwise read existing data
import os
if not os.path.exists("data.json"):
    file = open("data.json", "w")
    file.write(json.dumps( {"todos" : []} ))
    file.close()
else:
    content = read_data()
    todo_count = len(content['todos'])


eel.start("index.html")