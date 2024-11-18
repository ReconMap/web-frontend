import LabelledField from "components/form/LabelledField";
import NativeCheckbox from "components/form/NativeCheckbox";
import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect";
import { useState } from "react";
import UserRoles from "../../models/UserRoles";
import PrimaryButton from "../ui/buttons/Primary";

const UserForm = ({ isEdit = false, user, userSetter: setUser, onFormSubmit }) => {
    const [passwordGenerationMethod, setPasswordGenerationMethod] = useState("autogenerated");

    const onFormChange = (ev) => {
        const target = ev.target;
        const name = target.name;
        const value = target.type === "checkbox" ? target.checked : target.value;
        setUser({ ...user, [name]: value });
    };

    const onPasswordGenerationMethodChange = (ev) => {
        setPasswordGenerationMethod(ev.target.value);
    };

    return (
        <form onSubmit={onFormSubmit}>
            <fieldset>
                <legend>Basic information</legend>

                <LabelledField
                    id="fullName"
                    label="Full name"
                    control={
                        <NativeInput
                            id="fullName"
                            type="text"
                            name="full_name"
                            value={user.full_name || ""}
                            onChange={onFormChange}
                            required
                        />
                    }
                />
                <LabelledField
                    label="Short bio"
                    control={
                        <NativeInput
                            type="text"
                            name="short_bio"
                            value={user.short_bio || ""}
                            onChange={onFormChange}
                            placeholder="DevSecOps, or Project Manager"
                        />
                    }
                />
                <LabelledField
                    label="Email"
                    control={
                        <NativeInput
                            type="email"
                            name="email"
                            value={user.email || ""}
                            onChange={onFormChange}
                            required
                        />
                    }
                />
                <LabelledField
                    label="Role"
                    control={
                        <NativeSelect name="role" onChange={onFormChange} value={user.role} required>
                            {UserRoles.map((role) => (
                                <option key={`role_${role.id}`} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </NativeSelect>
                    }
                />
                <LabelledField
                    label="Properties"
                    control={
                        <div>
                            <NativeCheckbox name="active" checked={user.active} onChange={onFormChange}>
                                Active
                            </NativeCheckbox>
                            <NativeCheckbox name="mfa_enabled" checked={user.mfa_enabled} onChange={onFormChange}>
                                2FA enabled
                            </NativeCheckbox>
                        </div>
                    }
                />
            </fieldset>

            <fieldset>
                <legend>Credentials</legend>
                <LabelledField
                    label="Username"
                    control={
                        <NativeInput
                            type="text"
                            name="username"
                            value={user.username || ""}
                            onChange={onFormChange}
                            autoFocus
                            required
                        />
                    }
                />
                {!isEdit && (
                    <>
                        <LabelledField
                            label="Password generation method"
                            control={
                                <NativeSelect
                                    name="passwordGenerationMethod"
                                    onChange={onPasswordGenerationMethodChange}
                                >
                                    <option value="auto">Auto-generated</option>
                                    <option value="manual">Manual</option>
                                </NativeSelect>
                            }
                        />
                        {passwordGenerationMethod === "manual" && (
                            <>
                                <LabelledField
                                    label="Password"
                                    control={
                                        <NativeInput
                                            type="password"
                                            name="unencryptedPassword"
                                            onChange={onFormChange}
                                            required
                                        />
                                    }
                                />
                                <LabelledField
                                    label=""
                                    control={
                                        <NativeCheckbox name="sendEmailToUser" onChange={onFormChange}>
                                            Send email to user
                                        </NativeCheckbox>
                                    }
                                />
                            </>
                        )}
                    </>
                )}
            </fieldset>

            <LabelledField
                label=""
                control={
                    <div className="control">
                        <PrimaryButton type="submit">{isEdit ? "Update" : "Create"}</PrimaryButton>
                    </div>
                }
            />
        </form>
    );
};

export default UserForm;