'use client'

import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useRepoReadmeStore } from '@/hooks/use-repo-readme-store';
import { GitPullRequest, ExternalLink } from 'lucide-react';

export const ContributingSection = () => {
    const { data, updateNestedData } = useRepoReadmeStore();

    return (
        <AccordionItem value="contributing" className="border border-[#30363d] rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 bg-[#161b22] hover:bg-[#21262d] text-white hover:no-underline">
                <div className="flex items-center gap-2">
                    <GitPullRequest className="w-4 h-4 text-[#3fb950]" />
                    <span>Contributing</span>
                    <Switch
                        checked={data.contributing.enabled}
                        onCheckedChange={(checked) => updateNestedData('contributing', 'enabled', checked)}
                        onClick={(e) => e.stopPropagation()}
                        className="ml-2 data-[state=checked]:bg-[#238636]"
                    />
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 space-y-4 bg-[#0d1117]">
                {/* Guidelines */}
                <div className="space-y-2">
                    <Label className="text-[#8b949e]">Contributing Guidelines (markdown)</Label>
                    <Textarea
                        value={data.contributing.guidelines}
                        onChange={(e) => updateNestedData('contributing', 'guidelines', e.target.value)}
                        placeholder="Describe how others can contribute to your project..."
                        className="min-h-[120px] bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] resize-none"
                    />
                    {/* Quick templates */}
                    <div className="flex flex-wrap gap-1">
                        <button
                            onClick={() => updateNestedData('contributing', 'guidelines',
                                `Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

Please make sure to update tests as appropriate.`
                            )}
                            className="px-2 py-1 text-xs rounded bg-[#21262d] text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-colors"
                        >
                            📝 Standard Template
                        </button>
                        <button
                            onClick={() => updateNestedData('contributing', 'guidelines',
                                `We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

Please see our [Contributing Guide](CONTRIBUTING.md) for more details.`
                            )}
                            className="px-2 py-1 text-xs rounded bg-[#21262d] text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-colors"
                        >
                            📄 Detailed Template
                        </button>
                    </div>
                </div>

                {/* Code of Conduct */}
                <div className="space-y-2">
                    <Label className="text-[#8b949e] flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> Code of Conduct URL (optional)
                    </Label>
                    <Input
                        value={data.contributing.codeOfConductUrl}
                        onChange={(e) => updateNestedData('contributing', 'codeOfConductUrl', e.target.value)}
                        placeholder="https://github.com/username/repo/blob/main/CODE_OF_CONDUCT.md"
                        className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58]"
                    />
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};
