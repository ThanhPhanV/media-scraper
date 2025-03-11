import { Button, IconButton } from "@mui/material";
import {
  FieldArrayWithId,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface AddScraperProps {
  onAddScraper: (data: any) => void;
  handleSubmit: UseFormHandleSubmit<
    {
      inputs: {
        value: string;
      }[];
    },
    undefined
  >;
  reset: UseFormReset<{
    inputs: {
      value: string;
    }[];
  }>;
  onAppendNew: () => void;
  register: UseFormRegister<{
    inputs: {
      value: string;
    }[];
  }>;
  fields: FieldArrayWithId<
    {
      inputs: {
        value: string;
      }[];
    },
    "inputs",
    "id"
  >[];
  errors: any;
}

interface ScraperInput {
  value: string;
}

export interface ScraperFormData {
  inputs: ScraperInput[];
}

export function AddScraper({
  onAddScraper,
  handleSubmit,
  reset,
  onAppendNew,
  register,
  fields,
  errors,
}: AddScraperProps) {
  return (
    <form onSubmit={handleSubmit(onAddScraper)}>
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className="">
            <input
              {...register(`inputs.${index}.value`, {
                required: true,
                pattern: /^(http|https):\/\/[^ "]+$/,
              })}
              placeholder={`Enter link ${index + 1}`}
              className="w-full p-3 mt-3 border border-gray-200 rounded-lg"
            />
            {errors.inputs?.[index]?.value?.type === "required" && (
              <div className="text-red-500 my-3">This field is required</div>
            )}
            {errors.inputs?.[index]?.value?.type === "pattern" && (
              <div className="text-red-500  my-3">Invalid URL</div>
            )}
          </div>
        ))}
      </div>
      <div className="mb-8 mt-3">
        <Button
          variant="contained"
          color="inherit"
          onClick={() => onAppendNew()}
        >
          ADD
        </Button>
        <Button
          variant="contained"
          color="success"
          style={{ marginLeft: 10, minWidth: 100 }}
          type="submit"
        >
          SAVE
        </Button>
        <IconButton onClick={() => reset()}>
          <RestartAltIcon />
        </IconButton>
      </div>
    </form>
  );
}
