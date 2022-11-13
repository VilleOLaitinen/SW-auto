import numpy as np

bensiini, diesel, automaatti, manuaali = 0, 1, 1, 0

""" Vuosi, km, polttoaine, moottorin tilavuus dl (lol), hinta """
training_data = [[2012, 248000, diesel, automaatti, 20, 10400],
                 [2011, 246000, diesel, automaatti, 20, 9900],
                 [2011, 254600, diesel, automaatti, 20, 8800],
                 [2013, 266000, diesel, automaatti, 20, 8900],
                 [2013, 280000, diesel, automaatti, 20, 9400],
                 [2011, 285000, diesel, automaatti, 20, 8450],
                 [2013, 252000, diesel, automaatti, 20, 12300],
                 [2011, 268000, bensiini, automaatti, 18, 8400],
                 [2012, 273000, diesel, manuaali, 20, 9200],
                 [2013, 261000, diesel, manuaali, 20, 8370],
                 [2012, 245000, diesel, manuaali, 20, 8360],
                 [2011, 245000, diesel, manuaali, 20, 8880],
                 [2011, 208000, diesel, automaatti, 20, 8900],
                 [2013, 238000, diesel, automaatti, 20, 10790],
                 [2013, 221000, diesel, automaatti, 20, 9750],
                 [2013, 233000, bensiini, automaatti, 20, 8900],
                 [2012, 206472, diesel, manuaali, 20, 10900],
                 [2011, 199000, bensiini, manuaali, 20, 10990],
                 [2013, 227000, diesel, automaatti, 20, 12390]]

# test_data = [[2012, 279000, 1, 1, 20, 100000],
#             [2012, 236000, 1, 1, 20, 9970]]

test_data = [[2012, 279000, 1, 1, 20, 100000]]


def main():
    """ Create training array"""
    training_list = []

    for i in range(len(training_data)):
        training_list.append(np.array(training_data[i], dtype='int64'))

    training_arr = np.array(training_list)

    y_list = []
    x_list = []

    for i in range(len(training_arr)):
        x_list.append(list(training_arr[i][:-1]))
        y_list.append(training_arr[i][-1])

    x_training = np.asarray(x_list)
    y_training = np.asarray(y_list)

    """ Create testing list """
    test_list = []

    for i in range(len(test_data)):
        test_list.append(np.array(test_data[i][:-1], dtype='int64'))

    x_testing = np.array(test_list)

    # print(np.matrix(x_list))
    # print(np.matrix(y_list))
    # print(np.matrix(x_testing))

    """fit a linear regression model to the data and get the coefficients"""
    c = np.linalg.lstsq(x_list, y_list)[0]

    # print(c)

    result = x_testing @ c

    print("Price estimate: ", str(result[0]) + " €")


main()
