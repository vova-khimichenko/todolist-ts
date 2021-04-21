import React, {ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {
    // debugger
    // console.log('callAddItemForm')
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const onAddItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        error !== null && setError(null)//?
        event.key === 'Enter' && onAddItem()
    }

    return (
        <div>
            <TextField
                error={!!error}
                variant={'filled'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                label={'Title'}
                helperText={error}
            />
            <IconButton
                color={"primary"}
                onClick={onAddItem}
            >
                <AddBox/>
            </IconButton>
        </div>
    )
})