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
        }
}