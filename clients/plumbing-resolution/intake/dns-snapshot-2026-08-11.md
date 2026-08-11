# DNS snapshot — plumbingresolution.com (Squarespace)
Captured 2026-08-11 from founder screenshots, BEFORE any go-live DNS change.
This is the rollback reference required by runbooks/GO-LIVE.md.

Notice shown by Squarespace: "This domain is managed by Google Workspace" —
email runs on Google Workspace. MX/TXT/verification records below must NOT
be modified during the Vercel cutover.

## Squarespace Domain Connect
| Type  | Name           | Priority | TTL   | Data |
|-------|----------------|----------|-------|------|
| CNAME | _domainconnect | N/A      | 4 hrs | _domainconnect.domains.squarespace.com |

## Custom records
| Type  | Name             | Priority | TTL   | Data |
|-------|------------------|----------|-------|------|
| CNAME | tllb33kqxjsi     | N/A      | 4 hrs | gv-y5ulhw3chnmmxb.dv.googlehosted.com |
| MX    | @                | 1        | 4 hrs | aspmx.l.google.com |
| MX    | @                | 5        | 4 hrs | alt1.aspmx.l.google.com |
| MX    | @                | 5        | 4 hrs | alt2.aspmx.l.google.com |
| MX    | @                | 10       | 4 hrs | alt3.aspmx.l.google.com |
| MX    | @                | 10       | 4 hrs | alt4.aspmx.l.google.com |
| TXT   | google._domainkey| N/A      | 4 hrs | v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ… (truncated in screenshot) |
| TXT   | @                | N/A      | 4 hrs | v=spf1 include:_spf.google.com ~all |

## Observations for the cutover
- There are NO custom A records on the apex (@) and NO www CNAME — the
  domain serves no website today. The Vercel cutover is purely ADDITIVE:
  add the apex A record and www CNAME that the Vercel Domains screen
  displays; delete and modify nothing.
- Rollback = remove those two added records; everything above stays
  untouched throughout.
