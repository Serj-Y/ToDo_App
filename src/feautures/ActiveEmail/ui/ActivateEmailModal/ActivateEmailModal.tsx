import React, { Suspense } from 'react';
import { ActivateEmailFormAsync } from '../ActivateEmailForm/ActivateEmailForm.async';
import {Modal} from "react-native";
import {Loader} from "../../../../shared/ui/Loader/Loader.tsx";

interface EditUserNameModalProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}
export const ActivateEmailModal = ({
    className, onClose, isOpen,
}: EditUserNameModalProps) => (
    // <Modal
    //     // className={classNames('', {}, [className])}
    //     isOpen={isOpen}
    //     onClose={onClose}
    //     lazy
    // >
        <Suspense fallback={<Loader />}>
            <ActivateEmailFormAsync />
        </Suspense>
    // </Modal>
);
