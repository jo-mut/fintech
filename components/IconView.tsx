import React from 'react';
import { View, Image } from 'react-native';

interface IconProps {
    icon?: any,
    color: string,
}

const Icon: React.FC<IconProps> = ({ icon, color }) => {
    return (
        <View className=''>
            <Image
                source={icon}
                tintColor={color}
                resizeMode='contain'
                className='w-6 h-6' />
        </View>
    )
};

export default Icon