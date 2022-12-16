""" README:
    1) Works at the moment with only a certain order of the keys in the JSON.

    2) All new non-int data exceptions must be added to code, while they are added to JSON.
    
    3. Add pyscript specific lines to html document before using. 
        https://github.com/pyscript/pyscript

            (<head>
            <script defer src="https://pyscript.net/latest/pyscript.js"></script>
            </head>)
            """
            
def estimate_price():
    import json
    import numpy as np

    # Opening JSON file
    with open('cars.json') as json_file:
        data = json.load(json_file)

    my_car = data['my_car'][0]
    p_dict, my_dict = {}, {}

    
    car_list = []
    training_data, test_data = [], []
    
    # Applying training_data from p_dict
    for i in range(len(data['cars'])):
        p_dict = data['cars'][i]
        
        for key in p_dict:
            if key in my_car:
                if key == 'engine':
                    litres = float(p_dict[key])
                    car_list.append(int(litres * 10))
                elif key == 'power_type' or key == 'gearbox_type' or key == 'drive_type':
                    if p_dict[key ] == 'diesel' or p_dict[key] == 'automatic' or p_dict[key] == 'front':
                        car_list.append(1)
                    else:
                        car_list.append(0)
                else:
                    car_list.append(p_dict[key])
            if key == 'price':
                car_list.append(p_dict[key])
        training_data.append(car_list)
        car_list = []

    # Applying test_data from my_dict

    for k in range(len(data['my_car'])):
        my_dict = data['my_car'][k]
        for key in my_dict:
            if key == 'engine':
                litres = float(my_dict[key])
                test_data.append(int(litres * 10))
            elif key == 'power_type' or key == 'gearbox_type' or key == 'drive_type':
                if my_dict[key ] == 'diesel' or my_dict[key] == 'automatic' or my_dict[key] == 'front':
                    test_data.append(1)
                else:
                    test_data.append(0)

            elif key != 'price':
                test_data.append(my_dict[key])

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
        test_list.append(np.array(test_data[i], dtype='int64'))

    x_testing = np.array(test_list)


    """fit a linear regression model to the data and get the coefficients"""
    c = np.linalg.lstsq(x_list, y_list)[0]

    # print(c)

    result = x_testing @ c

    return result


print(estimate_price())