
def estimate_price():
    import json
    import numpy as np

    # Opening JSON file
    with open('python/cars.json') as json_file:
        data = json.load(json_file)

    my_car = data['my_car'][0]
    p_dict, my_dict = {}, {}

    car_list = []
    training_data, test_data = [], []
    for i in range(len(data['cars'])):
        p_dict = data['cars'][i]
        
        for key in p_dict:
            if key in my_car:
                if key == 'engine':
                    litres = float(p_dict[key])
                    car_list.append(int(litres * 10))
                else:
                    car_list.append(p_dict[key])
            if key == 'price':
                car_list.append(p_dict[key])
        training_data.append(car_list)
        car_list = []

    for k in range(len(data['my_car'])):
        my_dict = data['my_car'][k]
        for key in my_dict:
            if key == 'engine':
                litres = float(p_dict[key])
                test_data.append(int(litres * 10))
            elif key != 'price':
                test_data.append(my_dict[key])

    """ Create training array"""
    training_list = []

    for i in range(len(training_data)):
        if training_data[i] == 'petrol' or training_data[i] == 'manual':
            training_list.append(np.array(0, dtype='int64'))
        elif training_data[i] == 'diesel' or training_data[i] == 'automat':
            training_list.append(np.array(0, dtype='int64'))
        else:
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
        if test_data[i] == 'petrol' or test_data[i] == 'manual':
            test_list.append(np.array(0, dtype='int64'))
        elif test_data[i] == 'diesel' or test_data[i] == 'automat':
            test_list.append(np.array(0, dtype='int64'))
        else:
            test_list.append(np.array(test_data[i][:-1], dtype='int64'))

    x_testing = np.array(test_list)


    """fit a linear regression model to the data and get the coefficients"""
    c = np.linalg.lstsq(x_list, y_list)[0]

    # print(c)

    result = x_testing @ c
    print(result)
    return str(result[0])


print(estimate_price())