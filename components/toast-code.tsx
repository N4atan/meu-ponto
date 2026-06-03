import toast from "react-hot-toast";

type Props = {
    label: string;
    code: string;
}

export const ToastCode = (p0: string, props: Props) => (
    toast((t) => (
        <div>
            <p>{props.label}</p>

            <div className="mockup-code w-full">
                <pre data-prefix=">" className="text-error">
                    <code>
                        {JSON.stringify(props.code, null, 2)}
                    </code>
                </pre>
            </div>
        </div>
    ), {
        duration: 5000
    })
)