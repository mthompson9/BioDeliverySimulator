import os
import random
import time


#Declarations

# Store the date and time in a string
timestamp = time.strftime("%Y_%m_%d" + "@ " + "%H:%M%S")
generic_name = 'data set'
filename = generic_name

# Path to save CSV to
csv_filepath = '/Users/innovationlab/Desktop/fede-bot'

# Locate and open/create the CSV file
csv_file = os.path.join(csv_filepath, filename + ".csv")

# Create the TSV file with headings
appendfile = open(csv_file, 'a')
print('opening  file now') #Test line
appendfile.write(
    'Combination' + ',' + 'Period 1' + ','+ 'Period 2' + ',' + 'Period 3' + '\n')  # this is the line that write in the log
appendfile.close()  # this closes and saves the file


def randFloat () :
    result = random.uniform(0, 100)
   # print(result)
    return result;


def fillArray (rows, cols) :
    for i in range (0, rows) :
        appendfile = open(csv_file, 'a')
        appendfile.write('random combination' +  ',')
        for j in range (0, cols) :
            print('writing to file now') #Test line
            appendfile = open(csv_file, 'a')
            print('file is open')  # Test line
            appendfile.write(str(randFloat()) + ',')
            print('file updated')  # Test line
        appendfile.write(
            '\n' )
        appendfile.close()


fillArray(10, 3)

