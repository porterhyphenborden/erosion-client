export default {
    'tiles': [
        {
            'type': 'soil',
            'resistance': 1
        },
        {
            'type': 'sandstone',
            'resistance': 2
        },
        {
            'type': 'limestone',
            'resistance': 3
        },
        {
            'type': 'granite',
            'resistance': 5
        },
        {
            'type': 'quartz',
            'resistance': 7
        }
    ],
    'board': 
        {'setup': 
            [
                ['sandstone', 'limestone', 'granite', 'soil', 'sandstone'],
                ['soil', 'sandstone', 'soil', 'granite', 'limestone'],
                ['quartz', 'soil', 'limestone', 'sandstone', 'soil'],
                ['soil', 'limestone', 'sandstone', 'limestone', 'granite'],
                ['sandstone', 'quartz', 'soil', 'soil', 'sandstone']
            ],
        'riverStart': {
            'row': 0,
            'column': 1,
            'access': 'top'
        },
        'riverEnd': {
            'row': 3,
            'column': 4,
            'access': 'right'
        },
        'gravity': 'SE'
        },
    'userScores': [
        {
            'scoreID': 1,
            'scoreNum': 1000,
            'date': '09/15/2019'
        },
        {
            'scoreID': 2,
            'scoreNum': 1200,
            'date': '09/16/2019'
        },
        {
            'scoreID': 3,
            'scoreNum': 2000,
            'date': '09/17/2019'
        },
    ],
    'highScores': [
        {
            'scoreID': 1,
            'scoreNum': 2200,
            'date': '09/15/2019',
            'user': 'BOB SUX'
        },
        {
            'scoreID': 2,
            'scoreNum': 2000,
            'date': '09/16/2019',
            'user': 'BOB SUX'
        },
        {
            'scoreID': 3,
            'scoreNum': 1900,
            'date': '09/17/2019',
            'user': 'BOB SUX'
        },
    ]
}