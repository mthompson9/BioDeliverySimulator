import math
import random


#Declarations
arrayTitle = ''
combination = 'combo_name'
finalArray = []
mirrorArray = []


def randFloat () :
    result = random.uniform(0, 100)
   # print(result)
    return result;


def fillArray (rows, cols) :
    for i in range (0, rows) :
        #print ('this is iter number ' + str(i)) #testline
        arrayTitle = []
        arrayTitle.append(combination + str(i))
        for j in range (0, cols) :
            element = randFloat()
            arrayTitle.append(element)

        finalArray.append(arrayTitle)
    return arrayTitle;

def groupArray (seedArr) :
    rows = len(seedArr)
    for i in range (0, rows):
        gArray = []
        array2entry = seedArr[i]
        #gArray.append(array2entry [0])
        cols = len(seedArr [1])
        for j in range (1, cols):
            middleMan = seedArr [i]
            element2 = middleMan [j]
            if element2 < 20 :
                element2 = 1
                gArray.append(element2)
            else:
                if element2 >= 20 and element2 < 40:
                    element2 = 2
                    gArray.append(element2)
                else:
                    if element2 >= 40 and element2 < 60:
                        element2 = 3
                        gArray.append(element2)
                    else:
                        if element2 >= 60 and element2 < 80:
                            element2 = 4
                            gArray.append(element2)
                        else:
                            if element2 >= 80 and element2 <= 100:
                                element2 = 5
                                gArray.append(element2)
        mirrorArray.append(gArray)
    return gArray;







(fillArray(10, 3))
print (finalArray)
groupArray(finalArray)
print (mirrorArray)


