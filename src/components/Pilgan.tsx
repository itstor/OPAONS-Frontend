import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';
import { ColorPartial } from '@mui/material/styles/createPalette';
import parse from 'html-react-parser';
import { useState } from 'react';

import { PilganType } from '@/ts/interfaces/Soal.interface';

const PilganIcon = styled('span', { shouldForwardProp: (props) => props !== 'content' })<{ content?: string }>(({ theme, content }) => ({
  width: 28,
  height: 28,
  borderRadius: '20%',
  backgroundColor: theme.palette.secondary.light,
  textAlign: 'center',
  lineHeight: '28px',
  '&:before': {
    content: `"${content}"`,
  },
  color: theme.palette.primary.main,
  fontWeight: 'bolder',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: (theme.palette.secondary as ColorPartial)[600],
  },
  'input:hover disabled ~ &': {
    backgroundColor: (theme.palette.secondary as ColorPartial)[300],
  },
}));

const PilganSelectedIcon = styled(PilganIcon)({
  color: '#ffffff',
  contentVisibility: 'visible',
  visibility: 'visible',
  backgroundColor: '#3DC03E',
  'input:hover ~ &': {
    backgroundColor: '#3DC03E',
  },
});

function PilganRadio({ label, row, ...props }: { label: string; row?: boolean } & RadioProps) {
  return (
    <Radio
      sx={{
        '&:hover': {
          bgcolor: 'transparent',
        },
        marginX: row ? 0 : 2,
        marginTop: 0,
      }}
      disableRipple
      color='secondary'
      checkedIcon={<PilganSelectedIcon content={label} />}
      icon={<PilganIcon content={label} />}
      {...props}
    />
  );
}

const AnswerWrapper = styled('div')({
  cursor: 'default',
  '.MuiFormControlLabel-label &': {
    color: '#000000',
  },
  ol: {
    paddingLeft: '12px',
  },
  // fontSize: '1rem',
  // lineHeight: '1.5',
  width: '100%',
});

export default function Pilgan({
  direction = 'column',
  answer,
  controlValue,
  multipleChoice,
  handleOnChange,
  disabled,
}: {
  direction?: 'row' | 'column';
  answer?: PilganType;
  controlValue?: PilganType;
  multipleChoice: string[] | number;
  disabled?: boolean;
  handleOnChange?: (answer: PilganType) => void; //Todo remove optional
}) {
  const [selected, setSelected] = useState(answer);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelected(event.target.value as PilganType);
    if (handleOnChange) {
      handleOnChange(event.target.value as PilganType);
    }
  };

  const renderPilgan = (typeof multipleChoice === 'number' ? [...Array(multipleChoice as number)] : multipleChoice).map((p, i) => (
    <FormControlLabel
      key={i}
      value={String.fromCharCode('A'.charCodeAt(0) + i)}
      disabled={disabled}
      control={<PilganRadio label={String.fromCharCode('A'.charCodeAt(0) + i)} row={direction === 'row'} />}
      label={<AnswerWrapper>{parse(typeof p !== 'string' ? '' : p)}</AnswerWrapper>}
      disableTypography
    />
  ));

  return (
    <FormControl fullWidth>
      <RadioGroup
        row={direction === 'row'}
        value={controlValue || selected}
        onChange={
          controlValue
            ? (e) => {
                if (handleOnChange) {
                  handleOnChange(e.target.value as PilganType);
                }
              }
            : onChange
        }
      >
        {renderPilgan}
      </RadioGroup>
    </FormControl>
  );
}
