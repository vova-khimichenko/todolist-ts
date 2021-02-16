import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditedSpanPropsType = {
    value: string
    changeTitle: (title: string) => void
}

export const EditedSpan = React.memo(function (props: EditedSpanPropsType) {
    console.log('EditedSpan called')
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.value)
    let [error, setError] = useState<string | null>(null)
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode = () => {
        if (title.trim() !== '') {
            setEditMode(false)
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(event.currentTarget.value)
        props.changeTitle(title)
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && activateViewMode()
    }
    return editMode
        ? <TextField
            variant={'standard'}
            value={title}
            autoFocus onBlur={activateViewMode}
            onKeyPress={onKeyPressHandler}
            onChange={onChangeHandler}
            error={!!error}
            label={'Title'}
            helperText={error}
        />
        : <span onClick={activateEditMode}>{props.value}</span>
})