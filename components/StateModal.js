import React from 'react';
import { Modal, StyleSheet,Text, View } from 'react-native';

const StateModal = ({visible}) => {
    return (
        <View>
            <Modal>
                <View>
                    <Text>Inside State Modal{console.log('jeet is inside state modal')}</Text>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    
});

export default StateModal;
