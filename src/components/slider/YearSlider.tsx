import * as React from 'react';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import { useContext } from 'react';
import { Context } from '@/app/providers';
import { observer } from 'mobx-react-lite';

function valuetext(value: number) {
    return `${value}°C`;
}

const marks = [
    {
        value: 1954,
        label: '1954',
    },

    {
        value: 2024,
        label: '2024',
    },
];



function VerticalSlider() {
    const { games_store } = useContext(Context);


    const handleChange = (numsarr: any) => {
        const arr = Array.from({ length: numsarr[1] - numsarr[0] + 1 }, (n, i) => i + numsarr[0]);
        games_store.setSliderValues(numsarr)
        games_store.setRelease(arr)
    }
    return (
        <Stack sx={{ height: 50 }} spacing={1} direction="row">

            <Slider
                getAriaLabel={() => 'Temperature'}
                orientation="horizontal"
                getAriaValueText={valuetext}
                defaultValue={games_store.slider_values}
                value={games_store.slider_values}
                valueLabelDisplay="auto"
                marks={marks}
                max={2024}
                min={1954}

                onChange={(e, val) => handleChange(val)}
            />
        </Stack>
    );
}

export default observer(VerticalSlider);