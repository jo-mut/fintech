import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as DropdownMenu from 'zeego/dropdown-menu'
import Button from './button'
import { Icons } from '@/constants/Icons'


const DropDown = () => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger
                className='jusify-center'>
                <Button
                    icon={Icons.more}
                    type="rounded"
                    style='bg-gray-300 mt-3'
                    onPress={null}
                    color='black' />Ì
                <Text className='text-black mt-3'>More</Text>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Item key="statement">
                    <DropdownMenu.ItemTitle>
                        Statement
                    </DropdownMenu.ItemTitle>
                    <DropdownMenu.ItemIcon
                        ios={{
                            name: '0.circle.fill',
                            pointSize: 24,
                            weight: 'semibold',
                            scale: 'medium',
                        }} />
                </DropdownMenu.Item>
                <DropdownMenu.Item key="converter">
                    <DropdownMenu.ItemTitle>
                        Converter
                    </DropdownMenu.ItemTitle>
                    <DropdownMenu.ItemIcon
                        ios={{
                            name: '0.circle.fill',
                            pointSize: 24,
                            weight: 'semibold',
                            scale: 'medium',
                        }} />
                </DropdownMenu.Item>
                <DropdownMenu.Item key="theme">
                    <DropdownMenu.ItemTitle>
                        Theme
                    </DropdownMenu.ItemTitle>
                    <DropdownMenu.ItemIcon
                        ios={{
                            name: '0.circle.fill',
                            pointSize: 24,
                            weight: 'semibold',
                            scale: 'medium',
                        }} />
                </DropdownMenu.Item>
                <DropdownMenu.Item key="new-account">
                    <DropdownMenu.ItemTitle>
                        Add new account
                    </DropdownMenu.ItemTitle>
                    <DropdownMenu.ItemIcon
                        ios={{
                            name: '0.circle.fill',
                            pointSize: 24,
                            weight: 'semibold',
                            scale: 'medium',
                        }} />
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}

export default DropDown

const styles = StyleSheet.create({})